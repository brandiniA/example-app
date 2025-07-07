import { Spinner } from "./spinner"

export const SpinnerCard = ({ size = 'medium' }: { size?: 'small' | 'medium' | 'large' }) => {
    return (
        <div style={{ border: '1px solid #ccc', padding: '10px', borderRadius: '5px' }}>
            {/* Header */}
            <div>
                <h1>Card Example</h1>
            </div>
            {/* Loading content */}
            <div style={{ 
                padding: '10px', 
                display: 'flex', 
                flexDirection: 'column', 
                alignItems: 'center',
                justifyContent: 'center',
                minHeight: '100px' 
            }}>
                <Spinner size={size} />
            </div>
            {/* Footer - empty during loading */}
            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', gap: '10px' }}>
                {/* Buttons removed during loading state */}
            </div>
        </div>
    )
}
