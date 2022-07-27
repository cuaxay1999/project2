class BaseService {
    constructor() {
        this.model = null;
    }

    update = async (id, data) => {
        const kq = await this.model.update(id, data);
        return kq;
    };

    get = async () => {
        const kq = await this.model.getAll();
        return kq;
    };

    getById = async (id) => {
        const kq = await this.model.getById(id);
        return kq;
    };
}

module.exports = BaseService;
