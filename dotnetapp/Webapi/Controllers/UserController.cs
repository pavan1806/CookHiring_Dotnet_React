using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Data.SqlClient;
using Webapi.Models;

namespace Webapi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly IConfiguration _configuration;
        private readonly string _connectionString;


        private readonly SqlConnection _connection;

        public UserController(IConfiguration configuration)
        {
            _configuration = configuration;
            _connectionString = _configuration.GetConnectionString("myconnstring");
            _connection = new SqlConnection(_connectionString);
        }




        [HttpGet("getappliedjobs")]
        public IActionResult GetJobs()
        {
            try
            {
                using (SqlConnection connection = new SqlConnection(_connectionString))
                {
                    string query = "SELECT * FROM Jobseekers";

                    using (SqlCommand command = new SqlCommand(query, connection))
                    {
                        connection.Open();
                        SqlDataReader reader = command.ExecuteReader();

                        List<AdminModel> admins = new List<AdminModel>();

                        while (reader.Read())
                        {
                            AdminModel admin = new AdminModel
                            {
                                id = Convert.ToInt32(reader["id"]),
                                jobDescription = reader["jobDescription"].ToString(),
                                jobLocation = reader["jobLocation"].ToString(),
                                fromDate = Convert.ToDateTime(reader["fromDate"]),
                                toDate = Convert.ToDateTime(reader["toDate"]),
                                wagePerDay = reader["wagePerDay"].ToString(),
                                jobPhone = reader["jobPhone"].ToString(),
                                stat = reader["stat"].ToString()
                            };

                            admins.Add(admin);
                        }

                        return Ok(new { Status = "Success", Result = admins });
                    }
                }
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, ex);
            }
        }
        [HttpGet("getappliedcandidates")]
        public IActionResult GetCandidates()
        {
            try
            {
                using (SqlConnection connection = new SqlConnection(_connectionString))
                {
                    string query = "SELECT * FROM Jobseekers";

                    using (SqlCommand command = new SqlCommand(query, connection))
                    {
                        connection.Open();
                        SqlDataReader reader = command.ExecuteReader();

                        List<AdminModel> admins = new List<AdminModel>();

                        while (reader.Read())
                        {
                            AdminModel admin = new AdminModel
                            {
                                id = Convert.ToInt32(reader["id"]),
                                jobDescription = reader["jobDescription"].ToString(),
                                jobLocation = reader["jobLocation"].ToString(),
                                fromDate = Convert.ToDateTime(reader["fromDate"]),
                                toDate = Convert.ToDateTime(reader["toDate"]),
                                wagePerDay = reader["wagePerDay"].ToString(),
                                jobPhone = reader["jobPhone"].ToString(),
                                personName = reader["personName"].ToString(),
                                personAddress = reader["personAddress"].ToString(),
                                personExp = reader["personExp"].ToString(),
                                personPhone = reader["personPhone"].ToString(),
                                personEmail = reader["personEmail"].ToString(),
                                stat = reader["stat"].ToString()
                            };

                            admins.Add(admin);
                        }

                        return Ok(new { Status = "Success", Result = admins });
                    }
                }
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, ex);
            }
        }

        [HttpPut("updatestatus/{id}")]
        public IActionResult UpdateAdmin(int id, AdminModel updatedAdmin)
        {
            try
            {
                using (SqlConnection connection = new SqlConnection(_connectionString))
                {
                    string query = "UPDATE Jobseekers SET stat =@stat WHERE id = @id";

                    using (SqlCommand command = new SqlCommand(query, connection))
                    {
                        command.Parameters.AddWithValue("@id", id);
                       
                        command.Parameters.AddWithValue("@stat", updatedAdmin.stat);


                        connection.Open();
                        int rowsAffected = command.ExecuteNonQuery();

                        if (rowsAffected > 0)
                            return Ok(new { Status = "Success" });
                        else
                            return NotFound(new { Error = "Admin not found" });
                    }
                }
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, ex);
            }
        }






    }
}
