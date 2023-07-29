namespace Webapi.Models
{
    public class AdminModel
    {
        public int id { get; set; }
        public string jobDescription { get; set; }
        public string jobLocation { get; set; }
        public DateTime fromDate { get; set; }
        public DateTime toDate { get; set; }
        public string wagePerDay { get; set; }
        public string jobPhone { get; set; }
        public string personName { get; set; }
        public string personAddress { get; set; }
        public string personExp { get; set; }
        public string personPhone { get; set; }
        public string personEmail { get; set; }
        public string stat { get; set; }
    }
}
