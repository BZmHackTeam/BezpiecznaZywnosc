using System.ComponentModel.DataAnnotations;
using System.Data;
using System.Net;
using MailKit.Net.Smtp;
using Microsoft.Extensions.Options;
using MimeKit;

namespace Nyanlabs.SFood.Api.Services;

public class EmailClient : IDisposable
{
    public EmailClient(IOptions<EmailClientOptions> opts)
    {
        _opts = opts.Value;
        _cli = new();
        _cli.Connect(_opts.Host, _opts.Port, true);

        if (!_cli.IsConnected)
        {
            throw new DataException($"Cannot connect to {_opts.Host}:{_opts.Port}...");
        }

        var credentials = new NetworkCredential(_opts.User, _opts.Password);
        _cli.Authenticate(credentials);
        if (!_cli.IsAuthenticated)
        {
            throw new DataException($"{_opts.Host}:{_opts.Port}: Cannot authenticate user {_opts.User}.");
        }
    }

    private readonly EmailClientOptions _opts;
    private readonly SmtpClient _cli;

    public async Task<bool> SendAsync([EmailAddress] string addr)
    {
        return false;
    }

    internal async Task<bool> SendRawAsync([EmailAddress] string addr, string html)
    {
        MimeMessage msg = new();
        msg.From.Add(new MailboxAddress(_opts.FromName, _opts.FromAddr));

        var recipient = new MailboxAddress(addr, addr);

        if (recipient is null)
        {
            return false;
        }

        msg.To.Add(recipient);

        msg.Subject = "Zgłoszenie przyjęte";
        msg.Body = new TextPart("html", html);

        string result = await _cli.SendAsync(msg);
        return result.StartsWith("2.") && result.Contains("ok", StringComparison.InvariantCultureIgnoreCase);
    }

    public void Dispose()
    {
        _cli.Disconnect(true);
        _cli.Dispose();
    }
}

public record EmailClientOptions
{
    public required string Host { get; set; }
    public required string User { get; set; }
    public required string Password { get; set; }
    public required string FromName { get; set; }
    public required string FromAddr { get; set; }
    public int Port { get; set; } = 465;
};
