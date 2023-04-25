using Serilog;

internal class Program
{
    private static void Main(string[] args)
    {
        var builder = WebApplication.CreateBuilder(args);

        builder.Host.UseSerilog();

        const string CORSPOLICY = "omnisortPolicy";

        builder.Services.AddControllers(option =>
        {
            // only accepts JSON objects
            option.ReturnHttpNotAcceptable = true;
        });

#if !DEBUG
        Log.Logger = new LoggerConfiguration()
            .MinimumLevel
            .Information()
            .WriteTo
            .File("log/omnisortLogs.txt", rollingInterval: RollingInterval.Day)
            .CreateLogger();
#endif

#if DEBUG
        Log.Logger = new LoggerConfiguration()
            .MinimumLevel
            .Debug()
            .WriteTo
            .File("log/omnisortLogs.txt", rollingInterval: RollingInterval.Day)
            .CreateLogger();

# endif

        builder.Services.AddCors(
            options =>
        {
            options
            .AddPolicy(
                name: CORSPOLICY,
                policy =>
                {
                    policy
                    .AllowAnyOrigin()
                    .AllowAnyHeader()
                    .AllowAnyMethod();
                });
        });

        var app = builder.Build();
        app.MapGet("/", () => "Welcome to Omnisort!");
        app.UseHttpsRedirection();
        app.UseCors(CORSPOLICY);

        app.UseAuthorization();
        app.MapControllers();

        app.Run();
    }
}