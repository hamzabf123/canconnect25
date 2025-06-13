import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../../styles/auth.css';

const SignupPersonalInfo = ({ formData, setFormData, nextStep }) => {
  const [errors, setErrors] = React.useState({});

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.firstName.trim()) {
      newErrors.firstName = "Le prénom est requis";
    }
    
    if (!formData.lastName.trim()) {
      newErrors.lastName = "Le nom est requis";
    }
    
    if (!formData.dateOfBirth.trim()) {
      newErrors.dateOfBirth = "La date de naissance est requise";
    }
    
    if (!formData.nationality.trim()) {
      newErrors.nationality = "La nationalité est requise";
    }
    
    if (!formData.phoneNumber.trim()) {
      newErrors.phoneNumber = "Le numéro de téléphone est requis";
    }
    
    if (!formData.address.trim()) {
      newErrors.address = "L'adresse est requise";
    }
    
    if (!formData.emergencyContact.trim()) {
      newErrors.emergencyContact = "Le contact d'urgence est requis";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    
    // Effacer l'erreur lorsque l'utilisateur commence à taper
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: null
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      nextStep();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="signup-form">
      <div className="form-group">
        <div className="input-container">
          <i className="icon-user"></i>
          <input
            type="text"
            name="firstName"
            placeholder="First name"
            value={formData.firstName}
            onChange={handleChange}
            className={errors.firstName ? 'error' : ''}
          />
        </div>
        {errors.firstName && <span className="error-message">{errors.firstName}</span>}
      </div>
      
      <div className="form-group">
        <div className="input-container">
          <i className="icon-user"></i>
          <input
            type="text"
            name="lastName"
            placeholder="Last name"
            value={formData.lastName}
            onChange={handleChange}
            className={errors.lastName ? 'error' : ''}
          />
        </div>
        {errors.lastName && <span className="error-message">{errors.lastName}</span>}
      </div>
      
      <div className="form-group">
        <div className="input-container">
          <i className="icon-calendar"></i>
          <input
            type="date"
            name="dateOfBirth"
            placeholder="dd/mm/year"
            value={formData.dateOfBirth}
            onChange={handleChange}
            className={errors.dateOfBirth ? 'error' : ''}
          />
        </div>
        {errors.dateOfBirth && <span className="error-message">{errors.dateOfBirth}</span>}
      </div>
      <div className="form-group">
  <div className="input-container">
    <i className="icon-globe"></i>
    <select
      name="nationality"  
      value={formData.nationality}
      onChange={handleChange}
      className={errors.nationality ? 'error nationality-select' : 'nationality-select'}
    >
      <option value="" disabled>Select your nationality</option>
      <option value="af">Afghanistan</option>
      <option value="al">Albania</option>
      <option value="dz">Algeria</option>
      <option value="ad">Andorra</option>
      <option value="ao">Angola</option>
      <option value="ar">Argentina</option>
      <option value="am">Armenia</option>
      <option value="au">Australia</option>
      <option value="at">Austria</option>
      <option value="az">Azerbaijan</option>
      <option value="bh">Bahrain</option>
      <option value="bd">Bangladesh</option>
      <option value="bb">Barbados</option>
      <option value="by">Belarus</option>
      <option value="be">Belgium</option>
      <option value="bz">Belize</option>
      <option value="bj">Benin</option>
      <option value="bt">Bhutan</option>
      <option value="bo">Bolivia</option>
      <option value="ba">Bosnia and Herzegovina</option>
      <option value="bw">Botswana</option>
      <option value="br">Brazil</option>
      <option value="bn">Brunei</option>
      <option value="bg">Bulgaria</option>
      <option value="bf">Burkina Faso</option>
      <option value="bi">Burundi</option>
      <option value="kh">Cambodia</option>
      <option value="cm">Cameroon</option>
      <option value="ca">Canada</option>
      <option value="cv">Cape Verde</option>
      <option value="cf">Central African Republic</option>
      <option value="td">Chad</option>
      <option value="cl">Chile</option>
      <option value="cn">China</option>
      <option value="co">Colombia</option>
      <option value="km">Comoros</option>
      <option value="cg">Congo</option>
      <option value="cd">Congo (DRC)</option>
      <option value="cr">Costa Rica</option>
      <option value="ci">Côte d'Ivoire</option>
      <option value="hr">Croatia</option>
      <option value="cu">Cuba</option>
      <option value="cy">Cyprus</option>
      <option value="cz">Czech Republic</option>
      <option value="dk">Denmark</option>
      <option value="dj">Djibouti</option>
      <option value="dm">Dominica</option>
      <option value="do">Dominican Republic</option>
      <option value="ec">Ecuador</option>
      <option value="eg">Egypt</option>
      <option value="sv">El Salvador</option>
      <option value="gq">Equatorial Guinea</option>
      <option value="er">Eritrea</option>
      <option value="ee">Estonia</option>
      <option value="et">Ethiopia</option>
      <option value="fj">Fiji</option>
      <option value="fi">Finland</option>
      <option value="fr">France</option>
      <option value="ga">Gabon</option>
      <option value="gm">Gambia</option>
      <option value="ge">Georgia</option>
      <option value="de">Germany</option>
      <option value="gh">Ghana</option>
      <option value="gr">Greece</option>
      <option value="gd">Grenada</option>
      <option value="gt">Guatemala</option>
      <option value="gn">Guinea</option>
      <option value="gw">Guinea-Bissau</option>
      <option value="gy">Guyana</option>
      <option value="ht">Haiti</option>
      <option value="hn">Honduras</option>
      <option value="hu">Hungary</option>
      <option value="is">Iceland</option>
      <option value="in">India</option>
      <option value="id">Indonesia</option>
      <option value="ir">Iran</option>
      <option value="iq">Iraq</option>
      <option value="ie">Ireland</option>
      <option value="it">Italy</option>
      <option value="jm">Jamaica</option>
      <option value="jp">Japan</option>
      <option value="jo">Jordan</option>
      <option value="kz">Kazakhstan</option>
      <option value="ke">Kenya</option>
      <option value="ki">Kiribati</option>
      <option value="kp">Korea (North)</option>
      <option value="kr">Korea (South)</option>
      <option value="kw">Kuwait</option>
      <option value="kg">Kyrgyzstan</option>
      <option value="la">Laos</option>
      <option value="lv">Latvia</option>
      <option value="lb">Lebanon</option>
      <option value="ls">Lesotho</option>
      <option value="lr">Liberia</option>
      <option value="ly">Libya</option>
      <option value="li">Liechtenstein</option>
      <option value="lt">Lithuania</option>
      <option value="lu">Luxembourg</option>
      <option value="mg">Madagascar</option>
      <option value="mw">Malawi</option>
      <option value="my">Malaysia</option>
      <option value="mv">Maldives</option>
      <option value="ml">Mali</option>
      <option value="mt">Malta</option>
      <option value="mh">Marshall Islands</option>
      <option value="mr">Mauritania</option>
      <option value="mu">Mauritius</option>
      <option value="mx">Mexico</option>
      <option value="fm">Micronesia</option>
      <option value="md">Moldova</option>
      <option value="mc">Monaco</option>
      <option value="mn">Mongolia</option>
      <option value="me">Montenegro</option>
      <option value="ma">Morocco</option>
      <option value="mz">Mozambique</option>
      <option value="mm">Myanmar</option>
      <option value="na">Namibia</option>
      <option value="nr">Nauru</option>
      <option value="np">Nepal</option>
      <option value="nl">Netherlands</option>
      <option value="nz">New Zealand</option>
      <option value="ni">Nicaragua</option>
      <option value="ne">Niger</option>
      <option value="ng">Nigeria</option>
      <option value="no">Norway</option>
      <option value="om">Oman</option>
      <option value="pk">Pakistan</option>
      <option value="pw">Palau</option>
      <option value="pa">Panama</option>
      <option value="pg">Papua New Guinea</option>
      <option value="py">Paraguay</option>
      <option value="pe">Peru</option>
      <option value="ph">Philippines</option>
      <option value="pl">Poland</option>
      <option value="pt">Portugal</option>
      <option value="qa">Qatar</option>
      <option value="ro">Romania</option>
      <option value="ru">Russia</option>
      <option value="rw">Rwanda</option>
      <option value="kn">Saint Kitts and Nevis</option>
      <option value="lc">Saint Lucia</option>
      <option value="vc">Saint Vincent and the Grenadines</option>
      <option value="ws">Samoa</option>
      <option value="sm">San Marino</option>
      <option value="st">Sao Tome and Principe</option>
      <option value="sa">Saudi Arabia</option>
      <option value="sn">Senegal</option>
      <option value="rs">Serbia</option>
      <option value="sc">Seychelles</option>
      <option value="sl">Sierra Leone</option>
      <option value="sg">Singapore</option>
      <option value="sk">Slovakia</option>
      <option value="si">Slovenia</option>
      <option value="sb">Solomon Islands</option>
      <option value="so">Somalia</option>
      <option value="za">South Africa</option>
      <option value="es">Spain</option>
      <option value="lk">Sri Lanka</option>
      <option value="sd">Sudan</option>
      <option value="sr">Suriname</option>
      <option value="se">Sweden</option>
      <option value="ch">Switzerland</option>
      <option value="sy">Syria</option>
      <option value="tw">Taiwan</option>
      <option value="tj">Tajikistan</option>
      <option value="tz">Tanzania</option>
      <option value="th">Thailand</option>
      <option value="tl">Timor-Leste</option>
      <option value="tg">Togo</option>
      <option value="to">Tonga</option>
      <option value="tt">Trinidad and Tobago</option>
      <option value="tn">Tunisia</option>
      <option value="tr">Turkey</option>
      <option value="tm">Turkmenistan</option>
      <option value="tv">Tuvalu</option>
      <option value="ug">Uganda</option>
      <option value="ua">Ukraine</option>
      <option value="ae">United Arab Emirates</option>
      <option value="gb">United Kingdom</option>
      <option value="us">United States</option>
      <option value="uy">Uruguay</option>
      <option value="uz">Uzbekistan</option>
      <option value="vu">Vanuatu</option>
      <option value="ve">Venezuela</option>
      <option value="vn">Vietnam</option>
      <option value="ye">Yemen</option>
      <option value="zm">Zambia</option>
      <option value="zw">Zimbabwe</option>
    </select>
  </div>
  {errors.nationality && <span className="error-message">{errors.nationality}</span>}
</div>
      
      <div className="form-group">
        <div className="input-container">
          <i className="icon-phone"></i>
          <input
            type="tel"
            name="phoneNumber"
            placeholder="Phone number"
            value={formData.phoneNumber}
            onChange={handleChange}
            className={errors.phoneNumber ? 'error' : ''}
             pattern="[+]{0,1}[0-9]{10,15}"
          />
        </div>
        {errors.phoneNumber && <span className="error-message">{errors.phoneNumber}</span>}
      </div>
      
      <div className="form-group">
        <div className="input-container">
          <i className="icon-home"></i>
          <input
            type="text"
            name="address"
            placeholder="Address"
            value={formData.address}
            onChange={handleChange}
            className={errors.address ? 'error' : ''}
          />
        </div>
        {errors.address && <span className="error-message">{errors.address}</span>}
      </div>
      
      <div className="form-group">
        <div className="input-container">
          <i className="icon-emergency"></i>
          <input
            type="text"
            name="emergencyContact"
            placeholder="Emergency number"
            value={formData.emergencyContact}
            onChange={handleChange}
            className={errors.emergencyContact ? 'error' : ''}
          />
        </div>
        {errors.emergencyContact && <span className="error-message">{errors.emergencyContact}</span>}
      </div>
      
      <button type="submit" className="login-button">Next</button>
    </form>
  );
};

export default SignupPersonalInfo;
