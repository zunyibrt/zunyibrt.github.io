const CustomIcon = props => {
    return (
        <svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
        {/* <!-- Background Circle --> */}
        <circle cx="10" cy="10" r="10" fill="#333A3F" />
        
        {/* <!-- Divisions similar to the uploaded image --> */}
        <path d="M 9 0 L 9 20 M 9 8 L 20 8" stroke="#FFFFFF" stroke-width="0.8"/>
        
        {/* <!-- Stars --> */}
        <circle cx="5.5" cy="3.9" r=".3" fill="#FFFFFF" />
        <circle cx="17" cy="5" r=".2" fill="#FFFFFF" />
        <circle cx="5" cy="17" r=".2" fill="#FFFFFF" />
        <circle cx="15" cy="15" r=".3" fill="#FFFFFF" />
        
        {/* <!-- Additional small stars for more space effect --> */}
        {/* <circle cx="10" cy="3" r=".15" fill="#FFFFFF" />
        <circle cx="8" cy="17" r=".15" fill="#FFFFFF" />
        <circle cx="16" cy="10" r=".15" fill="#FFFFFF" />
        <circle cx="3" cy="12" r=".15" fill="#FFFFFF" /> */}
      </svg>
      
    )
  }
  
  export default CustomIcon
  