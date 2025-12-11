namespace MainRandevuBackend.Models
{
    public class Admin
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Email { get; set; }
        public string PasswordHash { get; set; }
        public string BranchName { get; set; } // Hangi şubeye ait (Self CarWash Şanlıurfa, vb.)
    }
}
