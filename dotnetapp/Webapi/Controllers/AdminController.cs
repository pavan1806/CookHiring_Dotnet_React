using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Data.Common;
using System.Data.SqlClient;
using System.Threading.Tasks;
using Webapi.Models;

namespace Webapi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AdminController : ControllerBase
    {
        private readonly IConfiguration _configuration;
        private readonly string _connectionString;

        
        private readonly SqlConnection _connection;

        public AdminController(IConfiguration configuration)
        {
            _configuration = configuration;
            _connectionString = _configuration.GetConnectionString("myconnstring");
            _connection = new SqlConnection(_connectionString);
        }




        [HttpGet("getprofile")]
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
                                personName = reader["personName"].ToString(),
                                personAddress = reader["personAddress"].ToString(),
                                personExp = reader["personExp"].ToString(),
                                personPhone = reader["personPhone"].ToString(),
                                personEmail = reader["personEmail"].ToString()
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

        [HttpDelete("deleteprofile/{id}")]
        public IActionResult DeleteAdmin(int id)
        {
            try
            {
                using (SqlConnection connection = new SqlConnection(_connectionString))
                {
                    string query = "DELETE FROM Jobseekers WHERE id = @id";

                    using (SqlCommand command = new SqlCommand(query, connection))
                    {
                        command.Parameters.AddWithValue("@id", id);

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

        [HttpGet("getprofile/{id}")]
        public IActionResult GetAdmin(int id)
        {
            try
            {
                using (SqlConnection connection = new SqlConnection(_connectionString))
                {
                    string query = "SELECT * FROM Jobseekers WHERE id = @id";

                    using (SqlCommand command = new SqlCommand(query, connection))
                    {
                        command.Parameters.AddWithValue("@id", id);

                        connection.Open();
                        SqlDataReader reader = command.ExecuteReader();

                        if (reader.Read())
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

                            return Ok(new { Status = "Success", Result = admin });
                        }
                        else
                        {
                            return NotFound(new { Error = "Admin not found" });
                        }
                    }
                }
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, ex);
            }
        }

        [HttpPut("updateprofile/{id}")]
        public IActionResult UpdateAdmin(int id, AdminModel updatedAdmin)
        {
            try
            {
                using (SqlConnection connection = new SqlConnection(_connectionString))
                {
                    string query = "UPDATE Jobseekers SET personName = @personName, personAddress = @personAddress, " +
                                   "personExp = @personExp, personPhone = @personPhone, personEmail = @personEmail " +
                                   "WHERE id = @id";

                    using (SqlCommand command = new SqlCommand(query, connection))
                    {
                        command.Parameters.AddWithValue("@id", id);
                        command.Parameters.AddWithValue("@personName", updatedAdmin.personName);
                        command.Parameters.AddWithValue("@personAddress", updatedAdmin.personAddress);
                        command.Parameters.AddWithValue("@personExp", updatedAdmin.personExp);
                        command.Parameters.AddWithValue("@personPhone", updatedAdmin.personPhone);
                        command.Parameters.AddWithValue("@personEmail", updatedAdmin.personEmail);
                        command.Parameters.AddWithValue("@jobDescription", updatedAdmin.jobDescription);
                        command.Parameters.AddWithValue("@jobLocation", updatedAdmin.jobLocation);
                        command.Parameters.AddWithValue("@fromDate", updatedAdmin.fromDate);
                        command.Parameters.AddWithValue("@toDate", updatedAdmin.toDate);
                        command.Parameters.AddWithValue("@wagePerDay", updatedAdmin.wagePerDay);
                        command.Parameters.AddWithValue("@jobPhone", updatedAdmin.jobPhone);
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



        [HttpPost("applyjob")]
        public IActionResult ApplyJob([FromBody] AdminModel adminModel)
        {
            try
            {
                string query = "INSERT INTO Jobseekers (jobDescription, jobLocation, fromDate, toDate, wagePerDay, jobPhone, personName, personAddress, personExp, personPhone, personEmail, stat) " +
                               "VALUES (@jobDescription, @jobLocation, @fromDate, @toDate, @wagePerDay, @jobPhone, @personName, @personAddress, @personExp, @personPhone, @personEmail, @stat)";

                using (SqlCommand command = new SqlCommand(query, _connection))
                {
                    command.Parameters.AddWithValue("@jobDescription", adminModel.jobDescription);
                    command.Parameters.AddWithValue("@jobLocation", adminModel.jobLocation);
                    command.Parameters.AddWithValue("@fromDate", adminModel.fromDate);
                    command.Parameters.AddWithValue("@toDate", adminModel.toDate);
                    command.Parameters.AddWithValue("@wagePerDay", adminModel.wagePerDay);
                    command.Parameters.AddWithValue("@jobPhone", adminModel.jobPhone);
                    command.Parameters.AddWithValue("@personName", adminModel.personName);
                    command.Parameters.AddWithValue("@personAddress", adminModel.personAddress);
                    command.Parameters.AddWithValue("@personExp", adminModel.personExp);
                    command.Parameters.AddWithValue("@personPhone", adminModel.personPhone);
                    command.Parameters.AddWithValue("@personEmail", adminModel.personEmail);
                    command.Parameters.AddWithValue("@stat", adminModel.stat);

                    _connection.Open();
                    int rowsAffected = command.ExecuteNonQuery();
                    _connection.Close();

                    if (rowsAffected > 0)
                        return Ok("Job application added successfully");
                    else
                        return BadRequest("Failed to add job application");
                }
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, ex);
            }
        }



    }
}
