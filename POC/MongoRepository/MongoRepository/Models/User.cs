using MongoDB.Bson.Serialization.Attributes;
using MongoDB.Bson;

namespace MongoRepository.Models
{
    public class User
    {
        [BsonId]        
        public string Id { get; set; }
        public string Name { get; set; }
        public string Email { get; set; }
    }
}
