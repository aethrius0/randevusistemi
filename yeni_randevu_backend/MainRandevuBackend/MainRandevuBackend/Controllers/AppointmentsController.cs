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

        // randevu çekme
        [HttpGet]
        public IActionResult GetAll()
        {
            var randevular = _context.Appointments.ToList();
            return Ok(randevular);
        }

        // randevu oluşturma
        [HttpPost]
        public IActionResult Create(Appointment appointment)
        {
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

            existing.CarPlate = updatedAppointment.CarPlate;
            existing.ServiceType = updatedAppointment.ServiceType;
            existing.AppointmentTime = updatedAppointment.AppointmentTime;

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
