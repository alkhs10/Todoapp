using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Models;
using Microsoft.EntityFrameworkCore;




namespace API.Data
{
 using Microsoft.EntityFrameworkCore;


public class TodoContext : DbContext
{
    public TodoContext(DbContextOptions<TodoContext> options) : base(options) { }
    public DbSet<TodoItem> TodoItems { get; set; }
}
}