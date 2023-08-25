import {format, parseISO} from "date-fns";

function TanggalComponent({ tanggalISO }) {
    const tanggal = parseISO(tanggalISO);
    const formattedDate = format(new Date(tanggal), "d MMMM yyyy");
    
    return <div>{formattedDate}</div>;
  }
  
  export default TanggalComponent;