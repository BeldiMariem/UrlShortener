describe('AuthPage tests', () => {
  const baseUrl = 'http://localhost:3000';
  const loginUrl = 'http://localhost:5000/auth/login';

  beforeEach(() => {
    cy.visit(`${baseUrl}/auth`);
  });

  it('should toggle to register form (force click)', () => {
    cy.get('#register-btn').click({ force: true });
    cy.get('button[type="submit"]').should('contain', 'Register');
  });

  it('should show error on failed login', () => {
    cy.get('input[name="email"]').type('wrong@example.com');
    cy.get('input[name="password"]').type('wrongpassword');
    cy.get('button[type="submit"]').click();

    // Message géré dans le composant via setError('Authentication failed')
    cy.get('[data-testid="auth-error"]', { timeout: 10000 })
      .should('be.visible')
      .and('contain', 'Authentication failed');
  });

  it('should login successfully and redirect to /home', () => {
    // Interception du login pour simuler une réponse positive
    cy.intercept('POST', loginUrl, {
      statusCode: 200,
      body: {
        user: { id: '123', name: 'Valid User', email: 'validuser@example.com' },
        token: 'mock-token-123',
      },
    }).as('loginRequest');

    cy.get('input[name="email"]').type('validuser@example.com');
    cy.get('input[name="password"]').type('validpassword');
    cy.get('button[type="submit"]').click();

    cy.wait('@loginRequest');
    cy.url({ timeout: 10000 }).should('include', '/home');
  });

  it('should register successfully (mock)', () => {
    cy.get('#register-btn').click({ force: true });

    cy.intercept('POST', 'http://localhost:5000/auth/register', {
      statusCode: 200,
      body: {
        user: {
          id: '456',
          name: 'New User',
          email: 'newuser@example.com',
        },
        token: 'mock-token-register',
      },
    }).as('registerRequest');

    cy.get('input[name="name"]').type('New User');
    cy.get('input[name="email"]').type('newuser@example.com');
    cy.get('input[name="password"]').type('securepassword');
    cy.get('button[type="submit"]').click();

    cy.wait('@registerRequest');
    cy.url({ timeout: 10000 }).should('include', '/home');
  });
});
