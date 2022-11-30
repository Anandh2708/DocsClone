using Microsoft.Extensions.Options;
using MongoDB.Driver;
using MongoRepository.Models;

namespace UserApi.Services;

public class UserService
{
    private IMongoCollection<User> _user;

    public UserService(IOptions<UserDatabaseSettings> userDatabaseSettings)
    {
        var mongoClient = new MongoClient(
            userDatabaseSettings.Value.ConnectionString);

        var mongoDatabase = mongoClient.GetDatabase(
            userDatabaseSettings.Value.DatabaseName);

        _user = mongoDatabase.GetCollection<User>(
            userDatabaseSettings.Value.CollectionName);
    }

    public async Task<List<User>> GetAsync() =>
        await _user.Find(_ => true).ToListAsync();

    public async Task<User?> GetAsync(string id) =>
        await _user.Find(x => x.Id == id).FirstOrDefaultAsync();

    public async Task CreateAsync(User newUser) =>
        await _user.InsertOneAsync(newUser);
    public async Task UpdateAsync(string id, User updatedUser) =>
    await _user.ReplaceOneAsync(x => x.Id == id, updatedUser);

    public async Task RemoveAsync(String id) =>
        await _user.DeleteOneAsync(x => x.Id == id);



}