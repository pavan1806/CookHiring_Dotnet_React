using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using System.Data.Common;
using System.Data.SqlClient;
using Webapi.Models;
namespace Webapi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly IConfiguration _configuration;
        private readonly SqlConnection _connection;

        public AuthController(IConfiguration configuration)
        {
            _configuration = configuration;
            _connection = new SqlConnection(_configuration.GetConnectionString("myconnstring"));
        }

        [HttpPost("register")]
        public IActionResult Register(UserModel userModel)
        {
            try
            {
                string query = "INSERT INTO Login (email, password, username, mobileNumber, userRole) " +
                               "VALUES (@email, @password, @username, @mobileNumber, @userRole)";

                using (SqlCommand command = new SqlCommand(query, _connection))
                {
                    command.Parameters.AddWithValue("@email", userModel.email);
                    command.Parameters.AddWithValue("@password", userModel.password);
                    command.Parameters.AddWithValue("@username", userModel.username);
                    command.Parameters.AddWithValue("@mobileNumber", userModel.mobileNumber);
                    command.Parameters.AddWithValue("@userRole", userModel.userRole);

                    _connection.Open();
                    int rowsAffected = command.ExecuteNonQuery();
                    _connection.Close();

                    if (rowsAffected > 0)
                        return Ok("User registered successfully");
                    else
                        return BadRequest("Failed to register user");
                }
            }
            catch (SqlException ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "An error occurred while registering user");
            }
        }

        [HttpPost("login")]
        public IActionResult Login(LoginModel loginModel)
        {
            try
            {
                string query = "SELECT * FROM Login WHERE email = @email AND password = @password";

                using (SqlCommand command = new SqlCommand(query, _connection))
                {
                    command.Parameters.AddWithValue("@email", loginModel.email);
                    command.Parameters.AddWithValue("@password", loginModel.password);

                    _connection.Open();
                    using (SqlDataReader reader = command.ExecuteReader())
                    {
                        if (reader.HasRows)
                        {
                            reader.Read();
                            string userRole = reader.GetString(reader.GetOrdinal("userRole"));

                            _connection.Close();

                            if (userRole == "admin")
                            {
                                return Ok(new { Status = "admin" });
                            }
                            else if (userRole == "customer")
                            {
                                return Ok(new { Status = "customer" });
                            }
                            else if (userRole == "jobseeker")
                            {
                                return Ok(new { Status = "jobseeker" });
                            }
                        }
                        else
                        {
                            _connection.Close();
                            return BadRequest(new { Status = "Error", Error = "Wrong Email or Password" });
                        }
                    }
                }
            }
            catch (SqlException ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "An error occurred while logging in");
            }

            return BadRequest(new { Status = "Error", Error = "Wrong Email or Password" });
        }


    }
}
