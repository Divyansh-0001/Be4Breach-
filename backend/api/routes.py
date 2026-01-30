from typing import List

from fastapi import APIRouter

from backend.schemas.common import MessageResponse, ServiceItem

router = APIRouter()

SERVICES: List[ServiceItem] = [
    ServiceItem(
        id="ai-security",
        name="AI Security",
        description="Secure AI models against adversarial and data threats.",
    ),
    ServiceItem(
        id="cloud-security",
        name="Cloud Security",
        description="Protect multi-cloud environments with continuous monitoring.",
    ),
    ServiceItem(
        id="red-teaming",
        name="Penetration Testing & Red Teaming",
        description="Simulate real-world attacks to expose vulnerabilities.",
    ),
    ServiceItem(
        id="soc-monitoring",
        name="SOC Monitoring",
        description="24/7 detection and response through CoE & SOC labs.",
    ),
]


@router.get("/services", response_model=List[ServiceItem])
def get_services():
    return SERVICES


@router.get("/about", response_model=MessageResponse)
def get_about():
    return MessageResponse(
        message=(
            "Be4Breach is a cybersecurity company headquartered in Pune, India, "
            "focused on predicting threats and closing security gaps before they "
            "impact business operations."
        )
    )


@router.get("/contact", response_model=MessageResponse)
def get_contact():
    return MessageResponse(
        message="Contact: +91 9461915152 • contact@be4breach.com"
    )
