namespace TodosBackEnd.Models
{
    public class Todo
    { // Khai báo các Property : Property là các thuộc tính (field)
        public int Id { get; set; }
        public string Name { get; set; }
        public bool IsComplete { get; set; }
    }
}
