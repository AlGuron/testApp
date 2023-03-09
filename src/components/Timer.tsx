import React, { useEffect } from "react";
import timeZones from "../time-zones";

type Props = {
    cityCountry: string;
}

export const Timer: React.FC<Props> = ({ cityCountry }) => {
    const styles: React.CSSProperties = {
        backgroundColor: "lightblue",
        fontSize: "2em"
    };    
    const [time, setTime] = React.useState(new Date());
    const myTimeZone = { timeZone: findTimeZone(cityCountry) };

    function tic() {
        setTime(new Date())
    }   
    
    useEffect(() => {       
        const interval = setInterval(tic, 1000);
        return () => clearInterval(interval);
    }, [])

    return <div className="timer">
        <h2 >Current Time in {cityCountry}</h2>
        <p style={styles}>{time.toLocaleTimeString("en-GB", myTimeZone)}</p>
    </div>
}

function findIndex(cityCountry: string): number {
    console.log("Enter func");
    return timeZones.findIndex((inp) => JSON.stringify(inp).includes(cityCountry));
}

function findTimeZone(cityCountry: string): string | undefined {
    const res = findIndex(cityCountry);
    return res === -1 ? undefined : timeZones[res].name;
}