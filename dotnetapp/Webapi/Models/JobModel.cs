namespace Webapi.Models
{
    public class JobModel
    {
        public int jobId { get; set; }
        public string jobDescription { get; set; }
        public string jobLocation { get; set; }
        public DateTime fromDate { get; set; }
        public DateTime toDate { get; set; }
        public string wagePerDay { get; set; }

        public string jobPhone { get; set; }


    }
}
