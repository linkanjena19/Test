using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using JWTAuth.Models;

namespace JWTAuth.API
{
    [Route("api/[controller]")]
    [ApiController]
    public class LoginController : ControllerBase
    {
        private readonly AppDbContext _Context;
        private readonly JWT jwt;
        private IConfiguration _config;
        public LoginController(AppDbContext context, JWT jwt, IConfiguration config)
        {
            _Context = context;
            this.jwt = jwt;
            _config = config;
        }
        [HttpPost("[action]")]
        public async Task<IActionResult> Login([FromForm] string username, [FromForm] string password)
        {
            var data = await _Context.Tbl_Security.ToListAsync();
            var responce = data.Where(x => x.User_Name == username).FirstOrDefault();
            var pass = CommonMethods.DecryptStringAES(responce.Password);

            if (responce != null)
            {
                if ( pass == password)
                {
                    var tokenDescriptor = new SecurityTokenDescriptor
                    {
                        Subject = new ClaimsIdentity(new Claim[]
                        {
                        new Claim("UserId",responce.Id.ToString())
                        }),
                        Expires = DateTime.UtcNow.AddDays(1),
                        SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config["JWT:JWT_Secret"])), SecurityAlgorithms.HmacSha256Signature)
                    };
                    var tokenHandler = new JwtSecurityTokenHandler();
                    var securityToken = tokenHandler.CreateToken(tokenDescriptor);
                    var token = tokenHandler.WriteToken(securityToken);
                    var remoteIpAddress = Request.HttpContext.Connection.RemoteIpAddress;
                   

                    var claims = new List<Claim>
                            {
                                new Claim(ClaimTypes.Name, responce.User_Name),
                                new Claim(ClaimTypes.PrimarySid, responce.Id.ToString()),
                            };

                    var claimsIdentity = new ClaimsIdentity(claims, CookieAuthenticationDefaults.AuthenticationScheme);
                    var authProperties = new AuthenticationProperties
                    {
                        ExpiresUtc = DateTime.Now.AddDays(1),
                    };
                    await HttpContext.SignInAsync(CookieAuthenticationDefaults.AuthenticationScheme, new ClaimsPrincipal(claimsIdentity), authProperties);

                    var result = new 
                    {
                        Id = responce.Id,
                        Name = responce.User_Name,
                        Token = token,
                        Message = "logged in successfully."
                    };

                    return Ok(new Response() { Status = "Success", Data = result });
                }
                else
                {
                    return Ok(new Response() { Status = "Error", Data = new Error() { Message = "Incorrect password." } });
                }
            }
            else
            {
                return Ok(new Response() { Status = "Error", Data = new Error() { Message = "Username not found." } });
            }
        }
    }
}
