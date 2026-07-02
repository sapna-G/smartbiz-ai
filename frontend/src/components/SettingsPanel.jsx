import {
  FaBuilding,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaIdCard,
  FaImage,
  FaUniversity,
  FaPercent,
  FaStickyNote,
  FaTimes,
  FaSave,
} from "react-icons/fa";

function SettingsPanel({ isOpen, onClose, company, setCompany }) {
  function handleChange(e) {
    const { name, value } = e.target;

    setCompany((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  function handleLogo(e) {
    const file = e.target.files[0];

    if (!file) return;

    const reader = new FileReader();

    reader.onloadend = () => {
      setCompany((prev) => ({
        ...prev,
        logo: reader.result,
      }));
    };

    reader.readAsDataURL(file);
  }

  function handleSave() {
    alert("Company settings saved successfully ✅");
    onClose();
  }

  return (
    <div className={`settings-panel ${isOpen ? "open" : ""}`}>
      <div className="settings-header premium-settings-header">
        <div>
          <p className="section-label">Business Profile</p>
          <h2>Company Settings</h2>
          <span>These details will appear on your invoices.</span>
        </div>

        <button onClick={onClose} className="settings-close-btn">
          <FaTimes />
        </button>
      </div>

      <div className="settings-logo-card">
        <div className="logo-preview-box">
          {company.logo ? (
            <img src={company.logo} alt="Company Logo" />
          ) : (
            <FaBuilding />
          )}
        </div>

        <label className="settings-upload-btn">
          <FaImage />
          {company.logo ? "Change Logo" : "Upload Logo"}

          <input type="file" accept="image/*" hidden onChange={handleLogo} />
        </label>
      </div>

      <div className="settings-form-grid">
        <div className="settings-field">
          <label>
            <FaBuilding /> Company Name
          </label>
          <input
            name="name"
            placeholder="Example: SmartBiz AI"
            value={company.name || ""}
            onChange={handleChange}
          />
        </div>

        <div className="settings-field">
          <label>
            <FaIdCard /> GST Number
          </label>
          <input
            name="gst"
            placeholder="Example: 27ABCDE1234F1Z5"
            value={company.gst || ""}
            onChange={handleChange}
          />
        </div>

        <div className="settings-field">
          <label>
            <FaPhone /> Phone Number
          </label>
          <input
            name="phone"
            placeholder="Example: +91 98765 43210"
            value={company.phone || ""}
            onChange={handleChange}
          />
        </div>

        <div className="settings-field">
          <label>
            <FaEnvelope /> Email
          </label>
          <input
            name="email"
            placeholder="Example: hello@smartbiz.ai"
            value={company.email || ""}
            onChange={handleChange}
          />
        </div>

        <div className="settings-field">
          <label>
            <FaUniversity /> UPI ID
          </label>
          <input
            name="upi"
            placeholder="Example: smartbiz@upi"
            value={company.upi || ""}
            onChange={handleChange}
          />
        </div>

        <div className="settings-field">
          <label>
            <FaPercent /> Default Tax Rate
          </label>
          <input
            name="taxRate"
            placeholder="Example: 18"
            value={company.taxRate || ""}
            onChange={handleChange}
          />
        </div>
      </div>

      <div className="settings-field full-field">
        <label>
          <FaMapMarkerAlt /> Company Address
        </label>
        <textarea
          name="address"
          placeholder="Enter your company address"
          rows="4"
          value={company.address || ""}
          onChange={handleChange}
        />
      </div>

      <div className="settings-field full-field">
        <label>
          <FaStickyNote /> Invoice Notes
        </label>
        <textarea
          name="notes"
          placeholder="Example: Thank you for your business. Payment is due within 7 days."
          rows="3"
          value={company.notes || ""}
          onChange={handleChange}
        />
      </div>

      <button className="save-btn premium-save-btn" onClick={handleSave}>
        <FaSave /> Save Company Settings
      </button>
    </div>
  );
}

export default SettingsPanel;