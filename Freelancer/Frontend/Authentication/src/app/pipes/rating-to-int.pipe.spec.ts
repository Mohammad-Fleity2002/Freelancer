import { RatingToIntPipe } from './rating-to-int.pipe';

describe('RatingToIntPipe', () => {
  it('create an instance', () => {
    const pipe = new RatingToIntPipe();
    expect(pipe).toBeTruthy();
  });
});
