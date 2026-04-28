# EDU-JOB Backend

## Prerequisites
- Python 3.9+
- PostgreSQL (or Supabase)

## How to Run

1. **Create a virtual environment (Optional but recommended):**
   ```powershell
   python -m venv venv
   .\venv\Scripts\activate
   ```

2. **Install dependencies:**
   ```powershell
   pip install -r requirements.txt
   ```

3. **Configure the Database:**
   Open `app/core/config.py` (or create a `.env` file) and update the `DATABASE_URL` to point to your PostgreSQL or Supabase database.
   For example, using Supabase:
   `postgresql://postgres:[YOUR-PASSWORD]@db.[YOUR-PROJECT-REF].supabase.co:5432/postgres`

4. **Start the FastAPI Server:**
   ```powershell
   uvicorn app.main:app --reload
   ```

5. **Access the API:**
   - Swagger UI (Interactive API Docs): http://127.0.0.1:8000/docs
   - Redoc: http://127.0.0.1:8000/redoc
