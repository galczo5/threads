import {ResponsiveCalendar} from "@nivo/calendar";
import {useRecoilState} from "recoil";
import {calendarVisibilityAtom} from "../state/CalendarVisibilityAtom";

export function Calendar() {

    const [calendarVisible] = useRecoilState(calendarVisibilityAtom);

    const template = <div className='app-footer'>
        <div className="app-footer__calendar">
            <ResponsiveCalendar data={[]}
                                from='2022-01-01'
                                to='2022-05-01'
                                dayBorderWidth={0}
                                daySpacing={2}
                                emptyColor="#737373"
                                dayBorderColor="transparent"
                                monthBorderColor="transparent"
                                monthSpacing={20}
                                isInteractive={false}
                                monthLegendPosition={'before'}
                                align={"bottom"}
                                colors={['#a3a3a3']}
                                theme={{
                                    textColor: '#e2e8f0'
                                }}
            />
        </div>
    </div>;

    return (calendarVisible ? template : <></>);
}
