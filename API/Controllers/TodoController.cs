using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;
using API.Models;

[ApiController]
[Route("api/[controller]")]
public class TodoController : ControllerBase
{
    private readonly TodoRepository _repository;

    public TodoController(TodoRepository repository)
    {
        _repository = repository;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<TodoItem>>> GetTodos()
    {
        var todos = await _repository.GetAllTodosAsync();
        return Ok(todos); 
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<TodoItem>> GetTodo(int id)
    {
        var todo = await _repository.GetTodoByIdAsync(id);
        if (todo == null)
        {
            return NotFound();
        }
        return todo;
    }

    [HttpPost]
    public async Task<ActionResult<TodoItem>> AddTodo(TodoItem todo)
    {
        await _repository.AddTodoAsync(todo);
        return CreatedAtAction(nameof(GetTodo), new { id = todo.Id }, todo);
    }

    [HttpPut("{id}/done")]
    public async Task<IActionResult> MarkAsDone(int id)
    {
        await _repository.MarkTodoAsDoneAsync(id);
        return NoContent();
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteTodo(int id)
    {
        await _repository.DeleteTodoAsync(id);
        return NoContent();
    }
}