export default function ForgetPassword() {
  return (
    <div>
      <h1>Forgot Password</h1>
      <form>
        <label>
          Email:
          <input type="email" name="email" />
        </label>
        <button type="submit">Send Reset Link</button>
      </form>
    </div>
  );
}
