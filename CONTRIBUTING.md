# Contributing to Eight

Thanks for your interest in contributing!

### Setup
To get started with the Eight project, follow these steps:

1. **Fork the repository**: Click the "Fork" button at the top right of this page to create your own copy of the repository.

2. **Clone your fork**: Use the following command to clone your fork to your local:
    ```bash
    git clone https://github.com/<your-username>/eight.git
    ```

3. **Navigate to the project directory**:
    ```bash
    cd eight
    ```

4. **Install dependencies**: Use Bun to install the project dependencies:   
    ```bash
    bun install
    ```

5. **Run the development server**: Start the development server with:
    ```bash
    bun run dev
    ```

### Making Changes

- Create a new branch for your changes:
    ```bash
    git checkout -b feature/your-feature-name
    ```

- Make your changes and commit them:
    ```bash
    git add .
    git commit -m "Add your commit message here"
    ```

- Push your changes to your fork:
    ```bash
    git push origin feature/your-feature-name   
    ```

- Open a pull request against the `main` branch of the original repository. 

### Code Style
We follow a consistent code style to maintain readability. Please ensure your code adheres to the following:
- Use 2 spaces for indentation.
- Use single quotes for strings, except when the string contains a single quote.
- Use semicolons at the end of statements.
- Use arrow functions for anonymous functions.
- Keep lines under 80 characters.

### Testing
- Write tests for any new features or bug fixes.
- Run the test suite to ensure everything works as expected:
    ```bash
    bun test
    ```

### Documentation
- Update the documentation to reflect any changes you make.
- Ensure your changes are well-documented in the code comments.

### Issues
If you find a bug or have a feature request, please open an issue in the repository. Provide as much detail as possible, including:
- Steps to reproduce the issue
- Expected behavior
- Actual behavior
- Screenshots if applicable

## Development Guidelines

### Pull Requests
- Ensure your pull request is against the `main` or the current `development` / `staging` branch.
- Provide a clear description of the changes you made.
- Reference any related issues by using `#issue-number`.
- Keep your pull request focused on a single feature or bug fix.
- Ensure your code passes all tests and adheres to the project's coding standards.
- If your pull request is large, consider breaking it into smaller, more manageable pieces.

### Branch Naming
- Use descriptive names for your branches, such as `feature/add-search-functionality` or `bugfix/fix-login-issue`.
- Avoid using generic names like `feature1` or `bugfix1`.

### Commit Messages
- Write clear and concise commit messages.
- Use the present tense ("frontend: Add search bar" not "Added search bar").
- Include a brief description of the changes made.

### Communication
- Use GitHub issues for tracking bugs and feature requests.
- Use pull requests for code reviews and discussions about changes.
- Use the project's [Discord server](https://discord.gg/eightphotos) for discussions and questions.
- For larger changes, consider discussing them in an issue before starting work to ensure alignment with the project's goals.


### License
By contributing to this project, you agree that your contributions will be licensed under the MIT License.