const request =  require('supertest');
const app =  require('../../src/app');
const connection =  require('../../src/database/connections');

describe('ONG', () => {
    beforeEach(async () => {
       await connection.migrate.rollback ();
       await connection.migrate.latest();
    });

    afterAll(async ()=> {
        await connection.destroy();
    })
     
    it('should be able to create a new ONG', async () => {
        const response = await request(app)
        .post('/ongs')
        .send({
            name:"ORGBDC1234",
            email:"contato@ong.com",
            whatsapp:"9999999912",
            city:"barra do corda12",
            uf:"MA" 
        });

       // console.log(response.body);

       expect(response.body).toHaveProperty('id');
       expect(response.body.id).toHaveLength(8);

    });
});