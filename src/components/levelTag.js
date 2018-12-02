import {Tag} from 'antd';

export const nameMap = ['debug', 'info', 'warn', 'error', 'fatal', 'null']
const colorMap = ['cyan', 'blue', 'orange', 'red', 'magenta', 'geekblue']

export default function LevelTag({level, key}) {
    return (
        <Tag
            color={colorMap[level]}
            key={key}
        >
            {nameMap[level]}
        </Tag>
    )
}