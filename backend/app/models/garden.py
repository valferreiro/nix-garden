
import uuid
from datetime import datetime, timezone

from sqlalchemy import DateTime, ForeignKey, String, Uuid
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.db.base import Base


class Garden(Base):
    __tablename__ = "gardens"

    id: Mapped[uuid.UUID] = mapped_column(
        Uuid,
        primary_key=True,
        default=uuid.uuid4,
    )

    habit_id: Mapped[uuid.UUID] = mapped_column(
        Uuid,
        ForeignKey("habits.id", ondelete="CASCADE"),
        unique=True,
        nullable=False,
    )

    name: Mapped[str] = mapped_column(
        String(100),
        nullable=False,
    )

    theme: Mapped[str] = mapped_column(
        String(50),
        default="natural",
        nullable=False,
    )

    created_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True),
        default=lambda: datetime.now(timezone.utc),
        nullable=False,
    )

    habit: Mapped["Habit"] = relationship(
        back_populates="garden",
    )
