package com.sideagroup.academy.repository;

import com.sideagroup.academy.model.Rating;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface RatingRepository  extends JpaRepository<Rating, Integer> {
}
