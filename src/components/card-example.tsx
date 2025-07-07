import { Button } from "./button"

export const CardExample = () => {
    return (
        <div style={{ border: '1px solid #ccc', padding: '10px', borderRadius: '5px' }}>
            {/* Header */}
            <div>
                <h1>Card Example</h1>
            </div>
            {/* Body */}
            <div style={{ padding: '10px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <span>Date (MM/DD/YYYY):</span>
                    <span>05/14/2025</span>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <span>Title (Max 20 characters):</span>
                    <span>Card Example</span>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <span>Description (Max 100 characters):</span>
                    <span>This is a card example</span>
                </div>
            </div>
            {/* Footer */}
            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', gap: '10px' }}>
                <Button>Edit</Button>
                <Button>Delete</Button>
            </div>
        </div>
    )
}