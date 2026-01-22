-- MUST be in postgres DB
\c postgres;
CREATE EXTENSION IF NOT EXISTS pg_cron;

-- App database
\c weeb_e_fied;

SELECT cron.schedule(
  'delete_expired_otps',
  '*/15 * * * *',
  $$ DELETE FROM otp WHERE expires_at < now(); $$
);

