using MainRandevuBackend.Data;
using MainRandevuBackend.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Linq;

namespace MainRandevuBackend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AdminController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public AdminController(ApplicationDbContext context)
        {
            _context = context;
        }

        // Admin Giriş
        [HttpPost("login")]
        public IActionResult Login([FromBody] AdminLoginRequest request)
        {
            var admin = _context.Admins.FirstOrDefault(a => a.Email == request.Email);
            if (admin == null)
                return Unauthorized(new { message = "Admin bulunamadı." });

            if (admin.PasswordHash != request.Password)
                return Unauthorized(new { message = "Şifre hatalı." });

            return Ok(new
            {
                message = "Giriş başarılı!",
                admin.Id,
                admin.Name,
                admin.Email,
                admin.BranchName
            });
        }

        // Admin Kayıt (Başlangıçta adminleri eklemek için)
        [HttpPost("register")]
        public IActionResult Register([FromBody] Admin admin)
        {
            if (_context.Admins.Any(a => a.Email == admin.Email))
                return BadRequest(new { message = "Bu e-posta adresi zaten kayıtlı." });

            _context.Admins.Add(admin);
            _context.SaveChanges();

            return Ok(new
            {
                message = "Admin kaydı başarılı!",
                admin.Id,
                admin.Name,
                admin.Email,
                admin.BranchName
            });
        }

        // Şubeye göre randevuları getir
        [HttpGet("appointments/{branchName}")]
        public IActionResult GetAppointmentsByBranch(string branchName)
        {
            var appointments = _context.Appointments
                .Include(a => a.User)
                .Where(a => a.CarWashName == branchName)
                .OrderByDescending(a => a.AppointmentTime)
                .Select(a => new
                {
                    a.Id,
                    a.CarPlate,
                    a.ServiceType,
                    a.AppointmentTime,
                    a.CarWashName,
                    a.Status,
                    a.Price,
                    a.UserId,
                    UserName = a.User != null ? a.User.Name : "Bilinmiyor",
                    UserEmail = a.User != null ? a.User.Email : "",
                    UserPhone = a.User != null ? a.User.Phone : ""
                })
                .ToList();

            return Ok(appointments);
        }

        // Randevu durumunu güncelle (Onayla/Reddet)
        [HttpPut("appointments/{id}/status")]
        public IActionResult UpdateAppointmentStatus(int id, [FromBody] StatusUpdateRequest request)
        {
            var appointment = _context.Appointments.FirstOrDefault(a => a.Id == id);
            if (appointment == null)
                return NotFound(new { message = "Randevu bulunamadı." });

            appointment.Status = request.Status;
            _context.SaveChanges();

            return Ok(new { message = $"Randevu {request.Status.ToLower()} olarak güncellendi.", appointment });
        }

        // Şubeye göre müşterileri getir (randevusu olan)
        [HttpGet("customers/{branchName}")]
        public IActionResult GetCustomersByBranch(string branchName)
        {
            var customerIds = _context.Appointments
                .Where(a => a.CarWashName == branchName)
                .Select(a => a.UserId)
                .Distinct()
                .ToList();

            var customers = _context.Users
                .Where(u => customerIds.Contains(u.Id))
                .Select(u => new
                {
                    u.Id,
                    u.Name,
                    u.Email,
                    u.Phone,
                    AppointmentCount = _context.Appointments.Count(a => a.UserId == u.Id && a.CarWashName == branchName)
                })
                .ToList();

            return Ok(customers);
        }
    }

    public class AdminLoginRequest
    {
        public string Email { get; set; }
        public string Password { get; set; }
    }

    public class StatusUpdateRequest
    {
        public string Status { get; set; }
    }
}
