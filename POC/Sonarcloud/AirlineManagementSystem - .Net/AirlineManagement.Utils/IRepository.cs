using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AirlineManagement.Utils
{
    public interface IRepository<E, I>
    {
        Task<E> Add(E entity);

        Task<E> GetById(I id);

        Task<List<E>> GetAll();

        Task Remove(I id);

        Task Update(E entity, Action<E, E> mergeOldNew);

        Task Save();
    }
}
