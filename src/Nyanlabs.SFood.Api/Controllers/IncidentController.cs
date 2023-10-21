using Microsoft.AspNetCore.Mvc;
using Nyanlabs.SFood.Api.Models;
using Nyanlabs.SFood.Api.Services;

namespace Nyanlabs.SFood.Api.Controllers;

[ApiController]
[Route("api/incident")]
public class IncidentController : ControllerBase
{
    public IncidentController(EmailClient mail)
    {
        _mail = mail;
    }

    private readonly EmailClient _mail;

    [HttpPost("submit")]
    public async Task<IActionResult> SubmitIncident([FromBody] IncidentSubmission incident)
    {
        string body = $@"<p>Dziękujemy za zgłoszenie incydentu.<p>
<p>Dane zgłoszenia:<br/>
<b>Identyfikator zgłoszenia:</b> {Random.Shared.NextInt64()}<br/>
<b>Produkt:</b> {incident.ProductName}<br/>
<b>Producent:</b> {incident.Producer}<br/>
<b>Opis incydentu:</b> {incident.Description}<br/>
<b>Miejsce zdarzenia:</b> {incident.Location}<br/>
<b>Data zgłoszenia:</b> {incident.Submitted.ToLongDateString()}
</p>";

        return (await _mail.SendRawAsync(incident.SubmitterAddress, body)) ? NoContent() : BadRequest();
    }
}
