using System;

namespace MainRandevuBackend.Models
{
    public class Appointment
    {
        public int Id { get; set; }
        public string CarPlate { get; set; }
        public string ServiceType { get; set; }
        public DateTime AppointmentTime { get; set; }

        public int UserId { get; set; }
        public User? User { get; set; }
    }
}
