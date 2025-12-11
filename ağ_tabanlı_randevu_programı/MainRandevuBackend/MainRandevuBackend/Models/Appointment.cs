using System;

namespace MainRandevuBackend.Models
{
    public class Appointment
    {
        public int Id { get; set; }
        public string CarPlate { get; set; }
        public string ServiceType { get; set; }
        public DateTime AppointmentTime { get; set; }
        public string? CarWashName { get; set; } // Oto yıkamacı adı
        public string Status { get; set; } = "Beklemede"; // Beklemede, Onaylandı, Reddedildi
        public decimal Price { get; set; } // Hizmet fiyatı

        public int UserId { get; set; }
        public User? User { get; set; }
    }
}
