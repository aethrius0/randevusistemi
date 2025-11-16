using MainRandevuBackend.Data;
using MainRandevuBackend.Models;
using Microsoft.AspNetCore.Mvc;
using System.Linq;

namespace MainRandevuBackend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public AuthController(ApplicationDbContext context)
        {
            _context = context;
        }

        // ✅ Kayıt ol
        [HttpPost("register")]
        public IActionResult Register([FromBody] User user)
        {
            if (_context.Users.Any(u => u.Email == user.Email))
                return BadRequest(new { message = "Bu e-posta adresi zaten kayıtlı." });

            _context.Users.Add(user);
            _context.SaveChanges();

            return Ok(new
            {
                message = "Kayıt başarılı!",
                user.Id,
                user.Name,
                user.Email
            });
        }

        // ✅ Giriş yap
        [HttpPost("login")]
        public IActionResult Login([FromBody] LoginRequest request)
        {
            var user = _context.Users.FirstOrDefault(u => u.Email == request.Email);
            if (user == null)
                return Unauthorized(new { message = "Kullanıcı bulunamadı." });

            if (user.PasswordHash != request.Password)
                return Unauthorized(new { message = "Şifre hatalı." });

            return Ok(new
            {
                message = "Giriş başarılı!",
                user.Id,
                user.Name,
                user.Email
            });
        }
    }

    // DTO sınıfı
    public class LoginRequest
    {
        public string Email { get; set; }
        public string Password { get; set; }
    }
}
