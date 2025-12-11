using Microsoft.AspNetCore.Mvc;
using MainRandevuBackend.Data;
using MainRandevuBackend.Models;
using System.Linq;

namespace MainRandevuBackend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class RandevuController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public RandevuController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpGet("{userId}")]
        public IActionResult GetAll(int userId)
        {
            var randevular = _context.Appointments
                .Where(r => r.UserId == userId)
                .OrderByDescending(r => r.Id) // En yeni en başta
                .ToList();

            return Ok(randevular);
        }

        // randevu oluşturma
        [HttpPost]
        public IActionResult Create(Appointment appointment)
        {
            // Aynı oto yıkamacıda aynı tarih ve saatte randevu var mı kontrol et
            var existingAppointment = _context.Appointments
                .FirstOrDefault(a => a.CarWashName == appointment.CarWashName 
                    && a.AppointmentTime == appointment.AppointmentTime);
            
            if (existingAppointment != null)
            {
                return BadRequest("Bu oto yıkamacıda seçilen tarih ve saatte zaten bir randevu bulunmaktadır. Lütfen başka bir saat seçin.");
            }
            
            _context.Appointments.Add(appointment);
            _context.SaveChanges();
            return Ok(appointment);
        }

        // randevu güncelleme
        [HttpPut("{id}")]
        public IActionResult Update(int id, Appointment updatedAppointment)
        {
            var existing = _context.Appointments.FirstOrDefault(a => a.Id == id);
            if (existing == null)
                return NotFound("Randevu bulunamadı.");

            // Aynı oto yıkamacıda aynı tarih ve saatte başka randevu var mı kontrol et (kendi randevusu hariç)
            var conflictingAppointment = _context.Appointments
                .FirstOrDefault(a => a.Id != id 
                    && a.CarWashName == updatedAppointment.CarWashName 
                    && a.AppointmentTime == updatedAppointment.AppointmentTime);
            
            if (conflictingAppointment != null)
            {
                return BadRequest("Bu oto yıkamacıda seçilen tarih ve saatte zaten bir randevu bulunmaktadır. Lütfen başka bir saat seçin.");
            }

            existing.CarPlate = updatedAppointment.CarPlate;
            existing.ServiceType = updatedAppointment.ServiceType;
            existing.AppointmentTime = updatedAppointment.AppointmentTime;
            existing.CarWashName = updatedAppointment.CarWashName;
            existing.Price = updatedAppointment.Price;

            _context.SaveChanges();
            return Ok(existing);
        }

        // randevu silme
        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            var appointment = _context.Appointments.FirstOrDefault(a => a.Id == id);
            if (appointment == null)
                return NotFound("Randevu bulunamadı.");

            _context.Appointments.Remove(appointment);
            _context.SaveChanges();

            return Ok("Randevu silindi.");
        }
    }
}
