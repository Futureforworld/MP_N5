# Defina uma quantidade mínima de caracteres para a senha
MIN_PASSWORD_LENGTH = 8

# Função para verificar se a senha atende aos requisitos de comprimento
def is_valid_password(password):
    return len(password) >= MIN_PASSWORD_LENGTH

# Função para verificar se o nome de usuário está cadastrado
def user_exists(username):
    existing_users = ["user1", "user2", "admin"]
    return username in existing_users

# Limita a quantidade de tentativas inválidas de login
MAX_ATTEMPTS = 5
attempts = 0

def login(username, password):
    global attempts
    if attempts >= MAX_ATTEMPTS:
        return "Limite de tentativas excedido. Tente novamente mais tarde."

    # Verifica se o usuário existe antes de verificar a senha
    if not user_exists(username):
        attempts += 1
        return "Usuário ou senha incorretos."

    # Verifica se a senha atende aos critérios mínimos
    if not is_valid_password(password):
        return "A senha deve ter no mínimo 8 caracteres."

    # Verifica as credenciais no banco de dados
    if not lookup_credentials_in_database(username, password):
        attempts += 1
        return "Usuário ou senha incorretos."

    # Reset das tentativas após sucesso
    attempts = 0
    return "Login bem-sucedido!"

# Função simulada de verificação das credenciais no banco de dados
def lookup_credentials_in_database(username, password):
    valid_credentials = {
        "user1": "password123",
        "user2": "admin123",
        "admin": "adminpassword"
    }
    return valid_credentials.get(username) == password

# Teste do login
username = "user1"
password = "password123"
result = login(username, password)
print(result)
