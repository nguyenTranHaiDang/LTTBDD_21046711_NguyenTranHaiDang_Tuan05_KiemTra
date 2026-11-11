/// <reference types="jest" />

import React from 'react';

import {
  render,
  fireEvent,
  screen,
} from '@testing-library/react-native';

import MovieCard from '../components/MovieCard';

const movie = {
  id: '1',
  title: 'Avengers',
  genre: 'Action',
  year: 2019,
  rating: 8,
  poster: 'https://example.com/poster.jpg',
  isShowing: true,
};

describe('MovieCard', () => {

  test('hiển thị đúng tên phim và rating', () => {
    render(
      <MovieCard
        movie={movie}
        onSelect={() => {}}
      />
    );

    expect(
      screen.getByText('Avengers')
    ).toBeTruthy();

    expect(
      screen.getByText('⭐ 8.0')
    ).toBeTruthy();
  });

  test('layout row có hiển thị thể loại', () => {
    render(
      <MovieCard
        movie={movie}
        layout="row"
        onSelect={() => {}}
      />
    );

    expect(
      screen.getByText('Thể loại: Action')
    ).toBeTruthy();
  });

  test('layout tile không hiển thị thể loại', () => {
    render(
      <MovieCard
        movie={movie}
        layout="tile"
        onSelect={() => {}}
      />
    );

    expect(
      screen.queryByText('Thể loại: Action')
    ).toBeNull();
  });

  test('isShowing true hiển thị đang chiếu', () => {
    render(
      <MovieCard
        movie={movie}
        onSelect={() => {}}
      />
    );

    expect(
      screen.getByText('✅ Đang chiếu')
    ).toBeTruthy();
  });

  test('isShowing false hiển thị ngừng chiếu', () => {
    const movieFalse = {
      ...movie,
      isShowing: false,
    };

    render(
      <MovieCard
        movie={movieFalse}
        onSelect={() => {}}
      />
    );

    expect(
      screen.getByText('❌ Ngừng chiếu')
    ).toBeTruthy();
  });

  test('nhấn MovieCard gọi onSelect đúng 1 lần', () => {
    const onSelect = jest.fn();

    render(
      <MovieCard
        movie={movie}
        onSelect={onSelect}
      />
    );

    fireEvent.press(
      screen.getByText('Avengers')
    );

    expect(onSelect).toHaveBeenCalledTimes(1);

    expect(onSelect).toHaveBeenCalledWith('1');
  });

});