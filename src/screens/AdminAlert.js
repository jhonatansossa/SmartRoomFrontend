
const AdminAlert = ({ onClose }) => {
  return (
    <div className="admin-alert">
      <h3>You must be an admin to register a new user.</h3>
      <button onClick={onClose}>Okay</button>
    </div>
  );
};

export default AdminAlert;
