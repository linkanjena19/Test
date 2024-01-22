using JWTAuth.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;

namespace JWTAuth.API
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly AppDbContext _Context;
        public UserController(AppDbContext Context)
        {
           _Context= Context;
        }
        [HttpPost("[action]")]
        public async Task<IActionResult> PostDetails([FromForm] string username, [FromForm] string password)
        {
            try
            {
                var dtls = new Security()
                {
                    User_Name = username,
                    Password = CommonMethods.EncryptStringAES(password)
                };
                await _Context.Tbl_Security.AddAsync(dtls);
                await _Context.SaveChangesAsync();

                return Ok(new Response() { Status = "Success", Data = new { Message = "Success." } });
            }
            catch (Exception ex)
            {
                return Ok(new Response() { Status = "Error", Data = new Error() { Message = ex.Message } });
            }
        }
    }
}
