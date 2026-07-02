function CompanyForm({ company, setCompany }) {
  function handleChange(e) {
    const { name, value } = e.target;

    setCompany((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  function handleLogo(e) {
    const file = e.target.files[0];

    if (file) {
      setCompany((prev) => ({
        ...prev,
        logo: URL.createObjectURL(file),
      }));
    }
  }

  return (
    <div className="card company-form">
      <h2>🏢 Company Information</h2>

      <div className="form-grid">
        <input
          type="text"
          name="name"
          placeholder="Company Name"
          value={company.name}
          onChange={handleChange}
        />

        <input
          type="text"
          name="gst"
          placeholder="GST Number"
          value={company.gst}
          onChange={handleChange}
        />

        <input
          type="text"
          name="phone"
          placeholder="Phone Number"
          value={company.phone}
          onChange={handleChange}
        />

        <input
          type="email"
          name="email"
          placeholder="Email Address"
          value={company.email}
          onChange={handleChange}
        />
      </div>

      <textarea
        rows="3"
        name="address"
        placeholder="Company Address"
        value={company.address}
        onChange={handleChange}
      />

      <label className="upload-box">
        {company.logo ? "Logo Selected ✅" : "Upload Company Logo"}

        <input
          type="file"
          accept="image/*"
          hidden
          onChange={handleLogo}
        />
      </label>
    </div>
  );
}

export default CompanyForm;