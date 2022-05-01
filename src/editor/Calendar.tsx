import {ResponsiveCalendar} from "@nivo/calendar";
import {useRecoilState} from "recoil";
import {calendarVisibilityAtom} from "../state/CalendarVisibilityAtom";
import {Colors} from "../Colors";
import {noteNodesAtom} from "../state/NoteNodesAtom";
import {CalendarDatum} from "@nivo/calendar/dist/types/types";

export function Calendar() {

    const [calendarVisible] = useRecoilState(calendarVisibilityAtom);
    const [nodes] = useRecoilState(noteNodesAtom);
    const colors = Colors.get();

    const fullYear = new Date().getFullYear();

    const data = nodes.map(n => n.updatedAt)
        .reduce((previousValue, currentValue) => [...previousValue, ...currentValue], [])
        .map(d => d.slice(0, 'YYYY-MM-DD'.length));

    const uniqueData = Array.from(new Set(data))
        .map(d => ({
            day: d,
            value: 1
        }));

    const template = <div className='app-footer'>
        <div className="app-footer__calendar">
            <ResponsiveCalendar data={uniqueData}
                                from={`${fullYear}-01-01`}
                                to={`${fullYear}-12-31`}
                                dayBorderWidth={0}
                                daySpacing={2}
                                emptyColor={colors.getForegroundColor()}
                                dayBorderColor="transparent"
                                monthBorderColor="transparent"
                                monthSpacing={20}
                                isInteractive={false}
                                monthLegendPosition={'before'}
                                align={"bottom"}
                                colors={[colors.getAccentColor()]}
                                theme={{
                                    textColor: colors.getTextColor()
                                }}
            />
        </div>
    </div>;

    return (calendarVisible ? template : <></>);
}
