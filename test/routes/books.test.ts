import app from '../../src/app';
import Book from '../../src/models/book';
import request from 'supertest';

describe('Books routes test', () => {

  test('should return http status code 404 when the endpoint not exist', async () => {
    const response: any = await request(app).get('/v1/book');
    expect(response.status).toBe(404);
  });

  test('should return http status code 200 when listing books', async () => {
    const bookMock = jest.spyOn(Book, 'find');
    bookMock.mockImplementation(() => [
      {
        id: '8c2ea7a0-8ba3-40c2-ad50-c37c93df452a',
        title: 'Some title',
        author: 'Some author',
      }
    ] as any);

    const response: any = await request(app).get('/v1/books');
    expect(response.status).toBe(200);
    const books = JSON.parse(response.text);
    expect(books[0]).toEqual({
      id: '8c2ea7a0-8ba3-40c2-ad50-c37c93df452a',
      title: 'Some title',
      author: 'Some author',
    });
  });

  test('should return http status code 201 when creating a book', async () => {
    const bookMock = jest.spyOn(Book.prototype, 'save');
    bookMock.mockImplementation(() => <any> {
      id: '8c2ea7a0-8ba3-40c2-ad50-c37c93df452a',
      title: 'Some new title',
      author: 'Some new author',
    });

    const response: any = await request(app).post('/v1/books').send({
      id: '8c2ea7a0-8ba3-40c2-ad50-c37c93df452a',
      title: 'Some new title',
      author: 'Some new author',
    });
    expect(response.status).toBe(201);
    const book = JSON.parse(response.text);
    expect(book).toEqual({
      id: '8c2ea7a0-8ba3-40c2-ad50-c37c93df452a',
      title: 'Some new title',
      author: 'Some new author',
    });
  });

});
