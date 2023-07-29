using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Data.SqlClient;
using Webapi.Models;

namespace Webapi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class JobController : ControllerBase
    {
        private readonly IConfiguration _configuration;
        private readonly SqlConnection _connection;

        public JobController(IConfiguration configuration)
        {
            _configuration = configuration;
            _connection = new SqlConnection(_configuration.GetConnectionString("myconnstring"));
        }

        [HttpPost("addjob")]
        public IActionResult AddJob(JobModel jobModel)
        {
            try
            {
                string query = "INSERT INTO Jobs (jobDescription, jobLocation, fromDate, toDate, wagePerDay, jobPhone) " +
                               "VALUES (@jobDescription, @jobLocation, @fromDate, @toDate, @wagePerDay, @jobPhone)";

                using (SqlCommand command = new SqlCommand(query, _connection))
                {
                    command.Parameters.AddWithValue("@jobDescription", jobModel.jobDescription);
                    command.Parameters.AddWithValue("@jobLocation", jobModel.jobLocation);
                    command.Parameters.AddWithValue("@fromDate", jobModel.fromDate);
                    command.Parameters.AddWithValue("@toDate", jobModel.toDate);
                    command.Parameters.AddWithValue("@wagePerDay", jobModel.wagePerDay);
                    command.Parameters.AddWithValue("@jobPhone", jobModel.jobPhone);

                    _connection.Open();
                    int rowsAffected = command.ExecuteNonQuery();
                    _connection.Close();

                    if (rowsAffected > 0)
                        return Ok("Added successfully");
                    else
                        return BadRequest("Failed to add");
                }
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, ex);
            }
        }

        [HttpGet("getjob")]
        public IActionResult GetJobs()
        {
            try
            {
                string query = "SELECT * FROM Jobs";

                using (SqlCommand command = new SqlCommand(query, _connection))
                {
                    _connection.Open();
                    SqlDataReader reader = command.ExecuteReader();

                    List<JobModel> jobs = new List<JobModel>();

                    while (reader.Read())
                    {
                        JobModel job = new JobModel
                        {
                            jobId = Convert.ToInt32(reader["jobId"]),
                            jobDescription = reader["jobDescription"].ToString(),
                            jobLocation = reader["jobLocation"].ToString(),
                            fromDate = Convert.ToDateTime(reader["fromDate"]),
                            toDate = Convert.ToDateTime(reader["toDate"]),
                            wagePerDay = reader["wagePerDay"].ToString(),
                            jobPhone = reader["jobPhone"].ToString()
                        };

                        jobs.Add(job);
                    }

                    _connection.Close();

                    return Ok(new { Status = "Success", Result = jobs });
                }
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, ex);
            }
        }

        [HttpDelete("deletejob/{id}")]
        public IActionResult DeleteJob(int id)
        {
            try
            {
                string query = "DELETE FROM Jobs WHERE jobId = @jobId";

                using (SqlCommand command = new SqlCommand(query, _connection))
                {
                    command.Parameters.AddWithValue("@jobId", id);

                    _connection.Open();
                    int rowsAffected = command.ExecuteNonQuery();
                    _connection.Close();

                    if (rowsAffected > 0)
                        return Ok(new { Status = "Success" });
                    else
                        return NotFound(new { Error = "Job not found" });
                }
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, ex);
            }
        }

        [HttpGet("getjob/{id}")]
        public IActionResult GetJob(int id)
        {
            try
            {
                string query = "SELECT * FROM Jobs WHERE jobId = @jobId";

                using (SqlCommand command = new SqlCommand(query, _connection))
                {
                    command.Parameters.AddWithValue("@jobId", id);

                    _connection.Open();
                    SqlDataReader reader = command.ExecuteReader();

                    if (reader.Read())
                    {
                        JobModel job = new JobModel
                        {
                            jobId = Convert.ToInt32(reader["jobId"]),
                            jobDescription = reader["jobDescription"].ToString(),
                            jobLocation = reader["jobLocation"].ToString(),
                            fromDate = Convert.ToDateTime(reader["fromDate"]),
                            toDate = Convert.ToDateTime(reader["toDate"]),
                            wagePerDay = reader["wagePerDay"].ToString(),
                            jobPhone = reader["jobPhone"].ToString()
                        };

                        _connection.Close();

                        return Ok(new { Status = "Success", Result = job });
                    }
                    else
                    {
                        _connection.Close();
                        return NotFound(new { Error = "Job not found" });
                    }
                }
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, ex);
            }
        }


        [HttpPut("updatejob/{id}")]
        public IActionResult UpdateJob(int id, JobModel updatedJob)
        {
            try
            {
                string query = "UPDATE Jobs SET jobDescription = @jobDescription, jobLocation = @jobLocation, " +
                               "fromDate = @fromDate, toDate = @toDate, wagePerDay = @wagePerDay, jobPhone = @jobPhone " +
                               "WHERE jobId = @jobId";

                using (SqlCommand command = new SqlCommand(query, _connection))
                {
                    command.Parameters.AddWithValue("@jobId", id);
                    command.Parameters.AddWithValue("@jobDescription", updatedJob.jobDescription);
                    command.Parameters.AddWithValue("@jobLocation", updatedJob.jobLocation);
                    command.Parameters.AddWithValue("@fromDate", updatedJob.fromDate);
                    command.Parameters.AddWithValue("@toDate", updatedJob.toDate);
                    command.Parameters.AddWithValue("@wagePerDay", updatedJob.wagePerDay);
                    command.Parameters.AddWithValue("@jobPhone", updatedJob.jobPhone);

                    _connection.Open();
                    int rowsAffected = command.ExecuteNonQuery();
                    _connection.Close();

                    if (rowsAffected > 0)
                        return Ok(new { Status = "Success" });
                    else
                        return NotFound(new { Error = "Job not found" });
                }
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, ex);
            }
        }





    }
}
