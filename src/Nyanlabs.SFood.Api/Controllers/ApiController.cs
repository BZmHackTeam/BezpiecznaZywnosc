using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace Nyanlabs.SFood.Api.Controllers;

[ApiController]
[Route("/api")]
public class ApiController : ControllerBase
{
    [HttpGet("version")]
    public string Version() => "1.0.0E";
}
