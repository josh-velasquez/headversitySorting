using Microsoft.AspNetCore.Mvc;
using System.Diagnostics;
using System.Text;

var builder = WebApplication.CreateBuilder(args);

const string CORSPOLICY = "sortingPolicy";

builder.Services.AddCors(options =>
{
    options.AddPolicy(name: CORSPOLICY,
        policy =>
        {
            policy.AllowAnyOrigin().AllowAnyHeader().AllowAnyMethod();
        });
});

// Add services to the container.
//builder.Services.AddRazorPages();

var app = builder.Build();

app.MapGet("/", () => "Welcome to Sorting!");

app.MapPost("/sorting", async delegate (HttpContext context)
{
    using (StreamReader reader = new StreamReader(context.Request.Body, Encoding.UTF8))
    {
        string jsonstring = await reader.ReadToEndAsync();
        Debug.WriteLine(jsonstring);
        return jsonstring;
    }
});


//// Configure the HTTP request pipeline.
//if (!app.Environment.IsDevelopment())
//{
//    app.UseExceptionHandler("/Error");
//    // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
//    app.UseHsts();
//}

//app.UseHttpsRedirection();
//app.UseStaticFiles();
app.UseCors(CORSPOLICY);
//app.UseRouting();

//app.UseAuthorization();

//app.MapRazorPages();

app.Run();