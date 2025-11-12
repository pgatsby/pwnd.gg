import "./profile-button.styles.css"

// interface ProfileButtonProps = {

// }

export default function ProfileButton({children,} : {children : React.ReactNode}){
    return (
        <div className="profile-button">
            {children}
        </div>
    )
}