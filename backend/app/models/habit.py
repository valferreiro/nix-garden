
import uuid
from datetime import datetime, timezone

from sqlalchemy import DateTime, ForeignKey, String, Uuid
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.db.base import Base


class Habit(Base):
    __tablename__ = "habits"

    id: Mapped[uuid.UUID] = mapped_column(
        Uuid,
        primary_key=True,
        default=uuid.uuid4,
    )

    user_id: Mapped[uuid.UUID] = mapped_column(
        Uuid,
        ForeignKey("users.id", ondelete="CASCADE"),
        nullable=False,
        index=True,
    )

    name: Mapped[str] = mapped_column(
        String(100),
        nullable=False,
    )

    description: Mapped[str | None] = mapped_column(
        String(500),
        nullable=True,
    )

    frequency: Mapped[str] = mapped_column(
        String(30),
        default="daily",
        nullable=False,
    )

    created_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True),
        default=lambda: datetime.now(timezone.utc),
        nullable=False,
    )

    user: Mapped["User"] = relationship(
        back_populates="habits",
    )

    garden: Mapped["Garden"] = relationship(
        back_populates="habit",
        uselist=False,
        cascade="all, delete-orphan",
    )

    completions: Mapped[list["Completion"]] = relationship(
        back_populates="habit",
        cascade="all, delete-orphan",
    )
