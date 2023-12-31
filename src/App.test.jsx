import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react'
import App from './App';
import user from "@testing-library/user-event";



describe('Check search', () => {
  it("Should display error message if search bar is empty", async () => {
    render(<App />);

    const searchBtn = screen.getByRole("button");
    await user.click(searchBtn);
   
    expect(await screen.findByText("Sorry pal, we couldn't see any word been typed inside input section to search.")).toBeInTheDocument();
  });

  it("Should display error message if search bar contains word with no definition", async () => {
    render(<App />);

    const input = screen.getByPlaceholderText('Search...');
    const searchBtn = screen.getByRole("button");
    await user.type(input, 'asd');
    await user.click(searchBtn);
   
    expect(await screen.findByText("Sorry pal, we couldn't find definitions for the word you were looking for.")).toBeInTheDocument();
  });

  it("Should display API result when asking the API", async () => {
    user.setup();
    render(<App />);

    const input = screen.getByPlaceholderText('Search...');
    const searchBtn = screen.getByRole("button");
    await user.type(input, 'hello');
    await user.click(searchBtn);

    expect(await screen.findByText('word hello')).toBeInTheDocument();
  });

  it("Should deliver 3 sound files when searching for hello", async () => {
    render(<App />);

    const input = screen.getByPlaceholderText('Search...');
    const searchBtn = screen.getByRole("button");
    await user.type(input, 'hello');
    await user.click(searchBtn);
    
    expect(await (screen.findAllByTestId("audio"))).toHaveLength(3)
  });

});